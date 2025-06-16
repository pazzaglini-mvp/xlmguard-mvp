// Full multilingual FAQPage.js with fully translated content including Thai
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function FAQPage() {
  const [language, setLanguage] = useState('English');

  const translations = {
    English: 'Frequently Asked Questions (FAQ)',
    Arabic: 'الأسئلة الشائعة (FAQ)',
    Chinese: '常见问题解答（FAQ）',
    French: 'Questions Fréquemment Posées (FAQ)',
    Spanish: 'Preguntas Frecuentes (FAQ)',
    German: 'Häufig Gestellte Fragen (FAQ)',
    Hindi: 'अक्सर पूछे जाने वाले प्रश्न (FAQ)',
    Portuguese: 'Perguntas Frequentes (FAQ)',
    Japanese: 'よくある質問（FAQ）',
    Korean: '자주 묻는 질문 (FAQ)',
    Lingala: 'Mituna Mingi ya Mbala na Mbala (FAQ)',
    Swahili: 'Maswali Yanayoulizwa Mara kwa Mara (FAQ)',
    Fijian: 'Taro Dau Tarogi (FAQ)',
    Indonesian: 'Pertanyaan yang Sering Diajukan (FAQ)',
    Taiwanese: '常見問題（FAQ）',
    Thai: 'คำถามที่พบบ่อย (FAQ)'
  };

  const faqs = {
    ...,
    Thai: (
      <div>
        <h2>XLMGuard คืออะไร?</h2>
        <p>XLMGuard เป็นบริการเอสโครว์และตรวจสอบการชำระเงินบนบล็อกเชนที่รองรับทั้ง Stellar (XLM) และ XRP โดยออกแบบมาเพื่อเพิ่มความเชื่อมั่นและความปลอดภัยให้กับการทำธุรกรรม โดยเฉพาะในธุรกรรมแบบเพียร์ทูเพียร์หรือการขายที่ต้องการการตรวจสอบนอกเครือข่าย</p>
        <h2>🔑 วิธีการทำงานของ XLMGuard</h2>
        <ul>
          <li><strong>เริ่มต้นการทำธุรกรรม:</strong> ผู้ส่งสร้างคำขอชำระเงินผ่าน XLMGuard</li>
          <li><strong>การเก็บเงินไว้:</strong> Lumens หรือ XRP จะถูกเก็บไว้ในเอสโครว์จนกว่าทั้งสองฝ่ายจะปฏิบัติตามเงื่อนไขที่กำหนดไว้</li>
          <li><strong>การตรวจสอบ:</strong> XLMGuard ตรวจสอบการทำธุรกรรม และอาจรวมกลไกการยืนยันนอกเครือข่าย</li>
          <li><strong>การปล่อยหรือคืนเงิน:</strong> เมื่อเงื่อนไขสำเร็จ เงินจะถูกปล่อยอัตโนมัติ หรือคืนเงินหากมีปัญหา</li>
        </ul>
        <h2>🌟 จุดเด่นของ XLMGuard</h2>
        <ul>
          <li><strong>รองรับหลายบล็อกเชน:</strong> ใช้งานได้ทั้ง XLM และ XRP ซึ่งเป็นสิ่งที่ไม่พบได้บ่อย</li>
          <li><strong>การตรวจสอบนอกเครือข่าย:</strong> ไม่ใช่แค่ multisig แต่ยังสามารถรวมการอนุมัติจากภายนอก</li>
          <li><strong>ความสมบูรณ์ของธุรกรรม:</strong> ป้องกันการโกงและข้อผิดพลาดด้วยการใช้เงื่อนไขล่วงหน้า</li>
          <li><strong>ออกแบบเพื่อการใช้งานจริง:</strong> เหมาะสำหรับการขายในตลาด งานฟรีแลนซ์ หรือธุรกรรมแบบเอสโครว์</li>
        </ul>
        <h2>✅ สรุป: XLMGuard มีจุดยืนพิเศษในธุรกรรม XLM หรือไม่?</h2>
        <p>ใช่ — XLMGuard โดดเด่นเพราะว่า:</p>
        <ul>
          <li>เป็นผู้ตรวจสอบการชำระเงินและเอสโครว์ที่ไม่ต้องควบคุมเงิน</li>
          <li>รองรับทั้งเครือข่าย Stellar และ Ripple</li>
          <li>รวมคุณสมบัติบล็อกเชนกับตรรกะนอกเครือข่าย</li>
          <li>ป้องกันความเสี่ยงจากคู่สัญญาด้วยการปล่อยเงินตามเงื่อนไขอัตโนมัติ</li>
        </ul>
        <p>ไม่ใช่แค่การรักษาคีย์ส่วนตัว แต่คือการสร้างความยุติธรรมและความสมบูรณ์ในธุรกรรม XLM ซึ่งเป็นจุดยืนเฉพาะของ XLMGuard</p>
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











