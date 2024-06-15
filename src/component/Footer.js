import React from 'react'
import "../App.css";

const Footer = () => {
  return (
    <div className="footer">
      <ul>
        <li>회사소개</li>
        <li>입점상담</li>
        <li>제휴문의</li>
        <li>이용약관</li>
        <li>개인정보처리방침</li>
        <li>고객센터</li>
        <li>채용정보</li>
        <li>GLOBAL</li>
      </ul>

      <div>
        상호명 : # CONCEPT ㅣ 대표자 : OOO ㅣ 주소 : OOO시 OOO구 OOO동 
        사업자등록번호 : OOO-OOO-OOO ㅣ 통신판매업신고 : 제OOO호-OOO-OOO호 사업자정보확인 │ 개인정보보호책임자 : OOO │ 호스팅서비스 : # CONCEPT
        <br />
        <span className="footer-text">* 비상업적 용도의 공부를 위한 개인 프로젝트 사이트 입니다 *</span>
      </div>

    </div>
  )
}

export default Footer
