import PropTypes from 'prop-types'

const ThankYouModal = (props) => {
  return (
    <div className={`bg-white w-80 h-44 border fixed top-1/2 left-1/2 -translate-x-1/2 ${props.transition} rounded-md shadow-xl transition duration-1000 ease-in-out`}>
    <div className="w-full h-full relative flex items-center justify-center flex-col">
      <i className="bi bi-x-square absolute right-1 top-0 text-3xl text-slate-500 drop-shadow-sm cursor-pointer" onClick={props.thanksToggle}></i>

      <i className="bi bi-hand-thumbs-up-fill w-12 rounded shadow-xl text-center align-middle bg-sky-500 text-3xl p-1 text-white mb-2 animate-bounce	"></i>
      <p className="text-2xl font-bold drop-shadow-md">Thanks you!</p>
      <p className="text-sm">Wait for response about your inquiry.</p>
    </div>
  </div>
  )
}

ThankYouModal.propTypes = {
  transition: PropTypes.string,
  thanksToggle: PropTypes.func
}

export default ThankYouModal
