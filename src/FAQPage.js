// Full multilingual FAQPage.js with fully translated content
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function FAQPage() {
  const [language, setLanguage] = useState('English');

  const translations = {
    English: 'Frequently Asked Questions (FAQ)',
    Arabic: 'الأسئلة الشائعة (FAQ)'
  };

  const faqs = {
    English: (
      <div>
        <h2>What is XLMGuard?</h2>
        <p>XLMGuard is a blockchain-based escrow and payment-verification service built for both Stellar (XLM) and XRP. It’s designed to add an extra layer of trust and security to transactions—especially in peer-to-peer payments, sales, or where trust needs to be off‑chain verified.</p>

        <h2>🔑 How XLMGuard Works</h2>
        <ul>
          <li><strong>Initiating a transaction:</strong> The sender creates a payment request via XLMGuard.</li>
          <li><strong>Holding funds:</strong> The lumens (or XRP) are placed in escrow until both parties fulfill predefined conditions.</li>
          <li><strong>Verification:</strong> XLMGuard monitors the transaction—possibly integrating off-chain confirmation mechanisms.</li>
          <li><strong>Release or refund:</strong> Once conditions are met, funds are automatically released, or refunded if something goes wrong.</li>
        </ul>

        <h2>🌟 What Makes It Unique?</h2>
        <ul>
          <li><strong>Cross‑chain support:</strong> It works with both XLM and XRP, which is less common—most escrow services target only one network.</li>
          <li><strong>Off‑chain verification:</strong> XLMGuard isn't just multisig—it can include external confirmations or approvals before releasing funds.</li>
          <li><strong>Transaction integrity:</strong> It prevents fraud and mistakes by enforcing pre-set terms in escrow, rather than trust-based or manual release.</li>
          <li><strong>Designed for real-world use cases:</strong> It’s tailor-made for things like marketplace sales, freelance work, or escrow-type transactions, not simply holding keys safely.</li>
        </ul>

        <h2>✅ Conclusion: A Unique Position in XLM Transactions?</h2>
        <p>Yes—XLMGuard stands out because it:
        <ul>
          <li>Acts as a non-custodial escrow and payment verifier,</li>
          <li>Works across both Stellar and Ripple networks,</li>
          <li>Utilizes blockchain features enriched with off-chain logic,</li>
          <li>Shields users from counterpart risk by automating condition-based releases.</li>
        </ul>
        It's not just about securing private keys—it's about ensuring transaction fairness and integrity for XLM transactions. That's its unique niche.</p>
      </div>
    ),
    Arabic: (
      <div>
        <h2>ما هو XLMGuard؟</h2>
        <p>XLMGuard هو نظام ضمان وتحقق من الدفع يعتمد على تقنية البلوكشين، تم تصميمه للعمل مع كل من Stellar (XLM) وXRP. يهدف إلى إضافة طبقة إضافية من الأمان والثقة في المعاملات، خاصة في عمليات الدفع بين الأفراد أو المبيعات أو أي موقف يتطلب تحقق خارجي من الثقة.</p>

        <h2>🔑 كيف يعمل XLMGuard</h2>
        <ul>
          <li><strong>بدء المعاملة:</strong> يقوم المرسل بإنشاء طلب دفع عبر XLMGuard.</li>
          <li><strong>احتجاز الأموال:</strong> يتم وضع Lumens أو XRP في الضمان حتى يستوفي الطرفان الشروط المحددة مسبقًا.</li>
          <li><strong>التحقق:</strong> يقوم XLMGuard بمراقبة المعاملة — مع إمكانية دمج آليات تحقق خارجية.</li>
          <li><strong>الإفراج أو الاسترداد:</strong> عند تحقق الشروط، يتم الإفراج عن الأموال تلقائيًا، أو استردادها في حال حدوث خلل.</li>
        </ul>

        <h2>🌟 ما الذي يجعل XLMGuard فريدًا؟</h2>
        <ul>
          <li><strong>دعم متعدد الشبكات:</strong> يعمل على كل من XLM وXRP، وهو أمر نادر حيث تدعم معظم خدمات الضمان شبكة واحدة فقط.</li>
          <li><strong>التحقق الخارجي:</strong> لا يعتمد فقط على التوقيعات المتعددة بل يمكن أن يشمل تأكيدات خارجية قبل الإفراج عن الأموال.</li>
          <li><strong>سلامة المعاملات:</strong> يمنع الاحتيال والأخطاء من خلال فرض الشروط مسبقة الاتفاق في نظام الضمان.</li>
          <li><strong>مصمم لحالات الاستخدام الواقعية:</strong> مثالي للمبيعات في الأسواق، والعمل الحر، أو الصفقات بين الأفراد.</li>
        </ul>

        <h2>✅ الخلاصة: هل لدى XLMGuard موقع فريد في معاملات XLM؟</h2>
        <p>نعم — يتميز XLMGuard لأنه:
        <ul>
          <li>يعمل كوسيط ضمان غير موثوق ومحقق للمدفوعات،</li>
          <li>يدعم كلاً من شبكتي Stellar وRipple،</li>
          <li>يستفيد من ميزات البلوكشين المدعمة بالمنطق الخارجي،</li>
          <li>يحمي المستخدمين من مخاطر الطرف المقابل من خلال أتمتة المدفوعات المشروطة.</li>
        </ul>
        إنه لا يقتصر على حماية المفاتيح الخاصة فقط — بل يتعلق بضمان عدالة وسلامة المعاملة في شبكة XLM. هذا هو مجاله الفريد.</p>
      </div>
    )
  };

  const allLanguages = Object.keys(translations);

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial, sans-serif', fontSize: '16px', lineHeight: '1.6' }}>
      <h1 style={{ textAlign: 'center' }}>{translations[language]}</h1>

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <label htmlFor="language">Select Language: </label>
        <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)}>
          {allLanguages.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>

      <div>{faqs[language]}</div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Link to="/">
          <button style={{ padding: '10px 20px', fontSize: '16px' }}>Return to Home Page</button>
        </Link>
      </div>
    </div>
  );
}

export default FAQPage;







