async function capitalize(sentence) {
    const trimmedSentence = sentence.trim(); // Xóa dấu cách ở đầu và cuối dòng
    const words = trimmedSentence.split(/\s+/); // Sử dụng regex để split dựa trên dấu cách
    const capitalizedWords = words.map(word => {
      const trimmedWord = word.trim(); // Xóa dấu cách ở đầu và cuối từ
      if (trimmedWord.length > 1) {
        // Kiểm tra nếu từ có nhiều hơn 1 ký tự
        const firstLetter = trimmedWord.charAt(0).toUpperCase();
        const restOfWord = trimmedWord.slice(1).toLowerCase();
        return firstLetter + restOfWord;
      } else {
        return trimmedWord.toLowerCase(); // Giữ nguyên từ nếu chỉ có 1 ký tự
      }
    });
    return capitalizedWords.join(' ');
  }
  
  module.exports = capitalize;
  