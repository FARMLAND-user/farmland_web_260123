import React from 'react';
import { X } from 'lucide-react';
import { SiteConfig } from '../types';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
}

const ModalBase: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar text-sm leading-relaxed text-gray-600 space-y-4">
          {children}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-gray-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors text-sm"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export const TermsModal: React.FC<LegalModalProps> = ({ isOpen, onClose, config }) => {
  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="이용약관">
      <div className="space-y-4">
        <h4 className="font-bold text-gray-900 text-base">제1조 (목적)</h4>
        <p>
          본 약관은 {config.companyName}(이하 "회사")가 운영하는 웹사이트에서 제공하는 서비스(이하 "서비스")를 이용함에 있어 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
        </p>

        <h4 className="font-bold text-gray-900 text-base mt-4">제2조 (정의)</h4>
        <p>
          1. "사이트"란 회사가 재화 또는 용역을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 등을 거래할 수 있도록 설정한 가상의 영업장을 말합니다.<br/>
          2. "이용자"란 사이트에 접속하여 본 약관에 따라 회사가 제공하는 서비스를 받는 자를 말합니다.
        </p>

        <h4 className="font-bold text-gray-900 text-base mt-4">제3조 (약관의 효력 및 변경)</h4>
        <p>
          1. 본 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력이 발생합니다.<br/>
          2. 회사는 사정 변경의 경우와 영업상 중요 사유가 있을 때 약관을 변경할 수 있으며, 변경된 약관은 전항과 같은 방법으로 효력을 발생합니다.
        </p>

        <h4 className="font-bold text-gray-900 text-base mt-4">제4조 (서비스의 내용)</h4>
        <p>
          회사는 다음과 같은 업무를 수행합니다.<br/>
          1. 회사 소개 및 비즈니스 정보 제공<br/>
          2. 농산물 유통 및 전처리 관련 상담 서비스<br/>
          3. 기타 회사가 정하는 업무
        </p>

        <h4 className="font-bold text-gray-900 text-base mt-4">제5조 (서비스의 중단)</h4>
        <p>
          회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.
        </p>

        <h4 className="font-bold text-gray-900 text-base mt-4">제6조 (저작권의 귀속 및 이용제한)</h4>
        <p>
          1. 회사가 작성한 저작물에 대한 저작권 및 기타 지적재산권은 회사에 귀속합니다.<br/>
          2. 이용자는 서비스를 이용함으로써 얻은 정보를 회사의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안 됩니다.
        </p>

        <h4 className="font-bold text-gray-900 text-base mt-4">제7조 (분쟁해결)</h4>
        <p>
          회사와 이용자는 서비스와 관련하여 발생한 분쟁을 원만하게 해결하기 위하여 필요한 모든 노력을 하여야 하며, 소송이 제기될 경우 회사의 본사 소재지를 관할하는 법원을 전속 관할 법원으로 합니다.
        </p>
      </div>
    </ModalBase>
  );
};

export const PrivacyModal: React.FC<LegalModalProps> = ({ isOpen, onClose, config }) => {
  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="개인정보처리방침">
      <div className="space-y-4">
        <p className="font-medium bg-gray-100 p-3 rounded text-gray-700">
          {config.companyName}(이하 '회사')은(는) 개인정보보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.
        </p>

        <h4 className="font-bold text-gray-900 text-base mt-4">1. 개인정보의 처리 목적</h4>
        <p>
          회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.<br/>
          - <strong>고객 문의 처리:</strong> 신원 확인, 문의사항 확인, 사실조사를 위한 연락·통지, 처리결과 통보 등
        </p>

        <h4 className="font-bold text-gray-900 text-base mt-4">2. 개인정보의 처리 및 보유 기간</h4>
        <p>
          회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유, 이용기간 내에서 개인정보를 처리, 보유합니다.<br/>
          - <strong>보유 기간:</strong> 문의 처리 완료 후 3년 (전자상거래 등에서의 소비자보호에 관한 법률 등 관계 법령에 따름) 또는 정보주체의 삭제 요청 시 즉시 파기
        </p>

        <h4 className="font-bold text-gray-900 text-base mt-4">3. 처리하는 개인정보의 항목</h4>
        <p>
          회사는 원활한 고객상담을 위해 아래와 같은 개인정보를 수집하고 있습니다.<br/>
          - <strong>수집항목:</strong> 성명, 연락처(휴대전화번호), 이메일, 문의내용<br/>
          - <strong>수집방법:</strong> 홈페이지 문의하기 폼
        </p>

        <h4 className="font-bold text-gray-900 text-base mt-4">4. 개인정보의 파기절차 및 방법</h4>
        <p>
          회사는 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다.<br/>
          - <strong>파기절차:</strong> 목적이 달성된 후 내부 방침 및 기타 관련 법령에 따라 일정 기간 저장된 후 파기됩니다.<br/>
          - <strong>파기방법:</strong> 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.
        </p>

        <h4 className="font-bold text-gray-900 text-base mt-4">5. 이용자 및 법정대리인의 권리와 그 행사방법</h4>
        <p>
          정보주체는 회사에 대해 언제든지 개인정보 열람, 정정, 삭제, 처리정지 요구 등의 권리를 행사할 수 있습니다. 권리 행사는 회사에 대해 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체 없이 조치하겠습니다.
        </p>

        <h4 className="font-bold text-gray-900 text-base mt-4">6. 개인정보 보호책임자</h4>
        <p>
          회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.<br/><br/>
          <strong>상호명:</strong> {config.companyName}<br/>
          <strong>연락처:</strong> {config.contactPhone}<br/>
          <strong>이메일:</strong> {config.contactEmail}
        </p>
      </div>
    </ModalBase>
  );
};
