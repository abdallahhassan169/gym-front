import React from "react";

const ImageDownloadComponent = () => {
  const handleImageClick = () => {
    // Assuming you have the URL of the image
    const imageUrl = "https://example.com/path/to/your/image.jpg";

    // Create a new anchor element
    const downloadLink = document.createElement("a");

    // Set the href attribute to the image URL
    downloadLink.href = imageUrl;

    // Set the download attribute with a suggested filename
    downloadLink.download = "downloaded_image.jpg";

    // Append the anchor element to the document
    document.body.appendChild(downloadLink);

    // Trigger a click event on the anchor element
    downloadLink.click();

    // Remove the anchor element from the document
    document.body.removeChild(downloadLink);
  };

  return (
    <div>
      <img
        src="https://example.com/path/to/your/image.jpg"
        alt="Click to download"
        onClick={handleImageClick}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default ImageDownloadComponent;
