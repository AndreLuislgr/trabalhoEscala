
const inputImage = document.getElementById('inputImage');
const canvasInput = document.getElementById('canvasInput');
const canvasOutput = document.getElementById('canvasOutput');
const resizeButton = document.getElementById('resizeButton');
const resultImage = document.getElementById('resultImage');
const ctxInput = canvasInput.getContext('2d');
const ctxOutput = canvasOutput.getContext('2d');

const loadImageButton = document.getElementById('loadImageButton');

loadImageButton.addEventListener('click', function() {
    inputImage.click();
});

inputImage.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.src = e.target.result;
            img.onload = function() {
                canvasInput.width = img.width;
                canvasInput.height = img.height;
                ctxInput.drawImage(img, 0, 0);
            };
        };
        reader.readAsDataURL(file);
    }
});

resizeButton.addEventListener('click', function() {
    const src = cv.imread(canvasInput);
    const dst = new cv.Mat();
    const dsize = new cv.Size(300, 300);
    cv.resize(src, dst, dsize, 0, 0, cv.INTER_AREA);
    cv.imshow(canvasOutput, dst);
    src.delete();
    dst.delete();

    // Converter a imagem redimensionada em base64 para exibição na tag img
    const resizedImageData = canvasOutput.toDataURL('image/jpeg');
    resultImage.src = resizedImageData;
});