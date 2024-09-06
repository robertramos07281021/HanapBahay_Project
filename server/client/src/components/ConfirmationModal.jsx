/* eslint-disable react/prop-types */
import { buttons } from "../OOP/ObjectOriented"

const ConfirmationModal = ({modalTransition,children,cancelModal,submit,submitButton,buttonValue, cancelSubmit}) => {


  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen z-50 bg-white/10 backdrop-blur-[0.8px] flex items-center justify-center">
        <div className={`w-96 h-60 bg-white rounded shadow-lg shadow-sky-500 duration-300 transition ${modalTransition ? "animate-bounceOut" : "animate-bounceIn"} flex flex-col gap-5 overflow-hidden`}>
          <div className="h-5/6 flex gap-5 flex-col py-2 px-5">
            {children}
          </div>
          <div className="flex gap-5 h-2/6 justify-end p-2 bg-sky-100 ">
            <button className={buttons.button(submitButton)} onClick={submit}>{buttonValue}</button>
            <button className={buttons.button(cancelSubmit)} onClick={cancelModal}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmationModal
