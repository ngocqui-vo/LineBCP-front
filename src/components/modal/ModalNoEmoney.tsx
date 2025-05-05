import { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { RouteBase } from "@/routes/routeUrl";
interface IModalNoEmoney {
  channelId: string | null;
}
const ModalNoEmoney = (props: IModalNoEmoney) => {
  // !State
  const { channelId } = props;
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const closeModal = () => setModalIsOpen(false);

  // !Function
  const closeLiff = () => {
    navigate(`${RouteBase.RegisterAraraCancel}?channel_id=${channelId}`);
  };

  // !Render
  return (
    <div className="flex items-center justify-center">
      <Modal
        shouldCloseOnOverlayClick={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="bg-white rounded-[12px] text-center shadow-lg px-[24px] pt-[32px] pb-[16px] outline-none"
        overlayClassName="fixed inset-0 bg-disable-disable300 bg-opacity-50 flex items-center justify-center"
      >
        <div className="pb-[16px] w-[246px]">
          <p className="text-dark-dark300 size16W600H22 mb-[2px]">{t("arara.eMoney.eMoneyNoService")}</p>
          <p className="text-secondary-secondary700 size14W400H20">{t("noService.subtitle")}</p>
        </div>
        <div onClick={closeLiff} className="text-center py-[14px] text-blue-blueLight100 size15W600H20">
          {t("register.submit")}
        </div>
      </Modal>
    </div>
  );
};

export default ModalNoEmoney;
