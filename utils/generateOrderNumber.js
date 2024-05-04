
// Function to generate a unique order ID with timestamp
const generateOrderNumber = () =>{
  const timestamp = Date.now();
  return `KAQ-${timestamp}`;
}

module.exports = generateOrderNumber;