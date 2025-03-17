import React, { useState, useEffect } from 'react';

const PhotoEdit = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bgColor, setBgColor] = useState('#ffffff'); // Default background color
  const [bgImage, setBgImage] = useState(null); // Background image selection
  const [resizedImage, setResizedImage] = useState(null); // To store resized image
  const [satisfaction, setSatisfaction] = useState(null); // Satisfaction rating state

  useEffect(() => {
    const introductionText = "Welcome to the Background Remover! Let's get started!";
    const synth = window.speechSynthesis;

    // Check if speech synthesis is supported
    if (synth) {
      const utterance = new SpeechSynthesisUtterance(introductionText);
      synth.speak(utterance);
    }
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); 
      setResult(null);
    }
  };

  const handleBgImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBgImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeBackground = async () => {
    if (!image) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('image_file', image);
    formData.append('size', 'auto');

    try {
      const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: { 'X-Api-Key': 'g9Gps7fu9GLnLkdpFVpW2Frd' },
        body: formData,
      });

      if (!response.ok) {
        console.error('Failed to process image:', response.status);
        return;
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setResult(imageUrl);
    } catch (error) {
      console.error('Error removing background:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetImage = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    setBgImage(null);
    setBgColor('#ffffff');
    setResizedImage(null);
  };

  const resizeImage = (size) => {
    let width = 300, height = 300;
    if (size === 'wallet') {
      width = 400; height = 600;
    } else if (size === 'passport') {
      width = 413; height = 531;
    }
    setResizedImage({ width, height });
  };

  const downloadImage = () => {
    if (resizedImage && result) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = resizedImage.width;
      canvas.height = resizedImage.height;

      // Fill with background color
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // If there's a background image, draw it first
      if (bgImage) {
        const bg = new Image();
        bg.src = bgImage;
        bg.onload = () => {
          ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
          drawMainImage(ctx, canvas);
        };
      } else {
        drawMainImage(ctx, canvas);
      }
    }
  };

  // Helper function to draw the final image
  const drawMainImage = (ctx, canvas) => {
    const img = new Image();
    img.src = result;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');

      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'final_image.png';
      a.click();
    };
  };

  return (
    <div className="flex flex-col items-center p-4 border rounded-lg shadow-md w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-white">Background Remover</h2>

      {!preview && !result && (
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold text-white">Upload Your Image</h3>
          <input type="file" accept="image/*" onChange={handleImageChange} className="mt-4 text-blue-500" />
        </div>
      )}

      {preview && !result && (
        <div className="mt-4">
          <img src={preview} alt="Preview" className="max-w-full h-auto" />
        </div>
      )}

      {preview && !result && (
        <button onClick={removeBackground} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4">
          {loading ? 'Processing...' : 'Remove Background'}
        </button>
      )}

      {result && (
        <>
          <div className="w-full sm:w-1/3 flex flex-col items-center bg-blue-950 p-4 rounded-lg mb-4 sm:mb-0">
            <h3 className="text-lg font-semibold text-white">Customize</h3>

            <label className="text-sm font-semibold">Background Color:</label>
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="ml-2 mt-2 mb-4" />

            <input type="file" accept="image/*" onChange={handleBgImageChange} className="mt-4" />

            <button onClick={resetImage} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
              Reset Image
            </button>
          </div>

          <div className="w-full sm:w-1/3 flex flex-col items-center bg-blue-950 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white">Resize Image</h3>
            <div className="flex justify-between w-full mt-4">
              <button onClick={() => resizeImage('custom')} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Custom Size
              </button>
              <button onClick={() => resizeImage('wallet')} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Wallet Size
              </button>
              <button onClick={() => resizeImage('passport')} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Passport Size
              </button>
            </div>
          </div>

          {resizedImage && (
            <div className="w-full sm:w-1/3 flex justify-center mt-4">
              <img
                src={result}
                alt="Resized Image"
                style={{
                  width: resizedImage.width,
                  height: resizedImage.height,
                  backgroundColor: bgColor,
                  backgroundImage: bgImage ? `url(${bgImage})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                className="object-contain"
              />
            </div>
          )}

          <div className="mt-4">
            <button onClick={downloadImage} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          Resized Image
            </button>
          </div>

          {/* Satisfaction Survey */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">How satisfied are you with our service?</h3>
            <div className="flex space-x-4">
              <button onClick={() => setSatisfaction('Good')} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                Good
              </button>
              <button onClick={() => setSatisfaction('Okay')} className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
                Okay
              </button>
              <button onClick={() => setSatisfaction('Poor')} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                Poor
              </button>
            </div>
            {satisfaction && (
              <p className="mt-4 text-white">
                Thank you for your feedback! You rated us: {satisfaction}.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PhotoEdit;
