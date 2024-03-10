// Assuming Node.js environment
const convertDateFormat = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return dateString; // Return original if parsing fails
    }
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    let year = date.getFullYear().toString().slice(-2);

    return `${day}-${month}-${year}`;
};

var enquiryDate = "2024-03-31T18:30:00.000Z"
enquiryDate = convertDateFormat(enquiryDate);
console.log(enquiryDate)