// SellerConfirmationPanel.js
import React, { useState, useEffect } from 'react';
import { db, storage } from './firebase.js';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { query, where, getDocs, collection, updateDoc, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import emailjs from '@emailjs/browser';

const SellerConfirmationPanel = () => {
  const [transactionId, setTransactionId] = useState('');
  const [documents, setDocuments] = useState({});
  const [existingDocuments, setExistingDocuments] = useState({});
  const [shipmentImages, setShipmentImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [status, setStatus] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSeller, setIsSeller] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [contractURL, setContractURL] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const snap = await getDoc(doc(db, 'users', user.uid));
        const role = snap.exists() ? snap.data().role : null;
        setIsSeller(role === 'seller');
      } else {
        setIsSeller(false);
      }
      setAuthChecked(true);
    });
  }, []);

  const documentTypes = [
    'CommercialInvoice',
    'PackingList',
    'BillOfLading',
    'InsuranceCertificate',
    'CertificateOfOrigin',
    'InspectionCertificate'
  ];

  const handleDocumentUpload = (type, file) => {
    setDocuments((prevDocs) => ({ ...prevDocs, [type]: file }));
  };

  const deleteDocument = async (type) => {
    if (!existingDocuments[type]) return;
    const fileRef = ref(storage, existingDocuments[type].split('/o/')[1].split('?')[0].replace('%2F', '/'));
    await deleteObject(fileRef);
    setExistingDocuments((prev) => {
      const updated = { ...prev };
      delete updated[type];
      return updated;
    });
  };

  const fetchContractURL = async () => {
    const q = query(collection(db, 'transactions'), where('transactionId', '==', transactionId));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const txData = snapshot.docs[0].data();
      if (txData.contractURL) setContractURL(txData.contractURL);
      if (txData.documentURLs) setExistingDocuments(txData.documentURLs);
      if (txData.shipmentImages) setExistingImages(txData.shipmentImages);
    }
  };

  const handleSubmit = async () => {
    if (!transactionId.trim()) return setStatus('Transaction ID is required.');
    if (!captchaChecked) return setStatus('Please verify the CAPTCHA.');
    if (!acceptTerms) return setStatus('You must accept the contract terms.');
    if (!auth.currentUser) return setStatus('Upload blocked: user not authenticated.');

    try {
      setStatus('');

      const q = query(collection(db, 'transactions'), where('transactionId', '==', transactionId));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) return setStatus('Transaction not found.');

      const transactionDoc = querySnapshot.docs[0];
      const docRef = transactionDoc.ref;
      const txData = transactionDoc.data();

      const docURLs = { ...existingDocuments };
      const imageURLs = [...existingImages];
      const uploadPromises = [];

      for (const type of documentTypes) {
        const file = documents[type];
        if (file) {
          const fileRef = ref(storage, `confirmations/${transactionId}_${type}_${file.name}`);
          uploadPromises.push(
            uploadBytes(fileRef, file)
              .then(() => getDownloadURL(fileRef))
              .then((url) => {
                docURLs[type] = url;
              })
          );
        }
      }

      for (const image of shipmentImages) {
        const imageRef = ref(storage, `confirmations/${transactionId}_image_${image.name}`);
        uploadPromises.push(
          uploadBytes(imageRef, image)
            .then(() => getDownloadURL(imageRef))
            .then((url) => {
              imageURLs.push(url);
            })
        );
      }

      await Promise.all(uploadPromises);

      await updateDoc(docRef, {
        sellerConfirmed: true,
        documentURLs: docURLs,
        shipmentImages: imageURLs,
        confirmedAt: new Date().toISOString(),
      });

      const serviceID = 'service_xyj5n7d';
      const sellerTemplateID = 'template_pixnkqs';
      const buyerTemplateID = 'template_9ry4lu4';
      const publicKey = 'tcS3_a_kZH9ieBNBV';

      const sellerEmail = txData.seller_email;
      let buyerEmail = txData.buyer_email;
      const confirmationLink = `https://xlmguard.com/dashboard?txid=${transactionId}`;

      if (!buyerEmail) {
        const buyerQuery = query(collection(db, 'users'), where('paymentHash', '==', transactionId));
        const buyerSnap = await getDocs(buyerQuery);
        if (!buyerSnap.empty) buyerEmail = buyerSnap.docs[0].data().email;
      }

      if (sellerEmail) {
        emailjs.send(serviceID, sellerTemplateID, {
          seller_email: sellerEmail,
          buyer_email: buyerEmail || 'n/a',
          amount: txData.amount || 'N/A',
          terms: txData.terms || 'N/A',
          txid: transactionId,
          link: confirmationLink,
        }, publicKey);
      }

      if (buyerEmail) {
        emailjs.send(serviceID, buyerTemplateID, {
          buyer_email: buyerEmail,
          txid: transactionId,
          link: confirmationLink,
        }, publicKey);
      }

      setRedirect(true);
    } catch (err) {
      console.error(err);
      setStatus('Error uploading confirmation.');
    }
  };

  if (!authChecked) return <div style={{ padding: '40px', textAlign: 'center' }}>Checking access...</div>;
  if (!isSeller) return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Access Denied</h2>
      <p>You must be logged in as a seller to view this page.</p>
      <button onClick={() => window.location.href = '/'}>Return to Home</button>
    </div>
  );
  if (redirect) return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Confirmation Received</h2>
      <p>Thank you. Your documents have been submitted successfully.</p>
      <a href="/">Return to Home</a><br /><br />
      <button onClick={() => window.location.href = '/'}>Return to Home Page</button>
    </div>
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>Seller Shipment Confirmation</h2>
      <input
        type="text"
        value={transactionId}
        onChange={(e) => setTransactionId(e.target.value)}
        onBlur={fetchContractURL}
        placeholder="Enter Transaction ID"
        style={{ marginBottom: '10px', width: '300px' }}
      />
      {contractURL && (
        <div style={{ marginBottom: '20px' }}>
          <h4>Contract Document</h4>
          <a href={contractURL} target="_blank" rel="noopener noreferrer">View Contract</a>{' | '}
          <a href={contractURL} download>Download Contract</a>
        </div>
      )}
      {documentTypes.map((type) => (
        <div key={type}>
          <label>Upload {type.replace(/([A-Z])/g, ' $1').trim()}:</label>
          <input type="file" onChange={(e) => handleDocumentUpload(type, e.target.files[0])} />
          {existingDocuments[type] && (
            <>
              <a href={existingDocuments[type]} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '10px' }}>View Existing</a>
              <button onClick={() => deleteDocument(type)} style={{ marginLeft: '10px' }}>Delete</button>
            </>
          )}
        </div>
      ))}
      <div>
        <label>Upload Shipment Images:</label>
        <input type="file" multiple onChange={(e) => setShipmentImages([...e.target.files])} />
      </div>
      <div style={{ marginTop: '10px' }}>
        <input
          type="checkbox"
          checked={acceptTerms}
          onChange={(e) => setAcceptTerms(e.target.checked)}
        /> I have reviewed the contract and accept the terms.
      </div>
      <div style={{ margin: '10px 0' }}>
        <input
          type="checkbox"
          id="captcha"
          checked={captchaChecked}
          onChange={(e) => setCaptchaChecked(e.target.checked)}
        />
        <label htmlFor="captcha"> I'm not a robot</label>
      </div>
      <button onClick={handleSubmit}>Submit Confirmation</button>
      {status && <p style={{ marginTop: '10px' }}>{status}</p>}
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => window.location.href = '/'}>Return to Home Page</button>
      </div>
    </div>
  );
};

export default SellerConfirmationPanel;



















