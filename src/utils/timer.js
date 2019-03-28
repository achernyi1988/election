const timer = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default timer;
