let buttons = new (function ButtonClassName() {
  this.button = function (color) {
    let hover = "";
    if (color === "red") {
      hover = `hover:bg-red-200`;
    } else {
      hover = `hover:bg-${color}-200`;
    }
    return `border-2 border-${color}-500 bg-${color}-500 text-base rounded font-bold w-28 text-white hover:text-${color}-500 ${hover} transition duration-300 ease-out py-1`;
  };
})();

export { buttons };
