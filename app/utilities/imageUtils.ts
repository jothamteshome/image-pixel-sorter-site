interface WorkerInput {
  pixels: Uint8ClampedArray;
  width: number;
  height: number;
}


interface WorkerOutput {
  sortedPixels: Uint8ClampedArray;
  width: number;
  height: number;
}


// Compute euclidean distance between two RGB pixels
const squaredDistance = function (r_1: number, g_1: number, b_1: number, r_2: number, g_2: number, b_2: number): number {
    const r_diff: number = r_2 - r_1;
    const g_diff: number = g_2 - g_1;
    const b_diff: number = b_2 - b_1;

    return r_diff * r_diff + g_diff * g_diff + b_diff * b_diff;
};


// Compute euclidean distance to black pixel
const squaredDistanceToBlack = function (r: number, g: number, b: number): number {
    // Scale current pixel using luminance measurements for the human eye
    return squaredDistance(0, 0, 0, 0.299*r, 0.587*g, 0.114*b);
};


const imageDataToImage = function (imgData: ImageData) {
    const canvas = document.createElement("canvas");
    canvas.width = imgData.width;
    canvas.height = imgData.height;

    const ctx = canvas.getContext("2d")!;
    ctx.putImageData(imgData, 0, 0);

    // Create image
    const img = new Image();
    img.src = canvas.toDataURL();
    return img;
};


const displayImage = function (imgElementId: string, img: HTMLImageElement): void {
    const inputImage: HTMLImageElement = document.getElementById(imgElementId) as HTMLImageElement;
    inputImage.src = img.src;
    inputImage.style.display = "flex";
};


const getImagePixels = function (img: HTMLImageElement): ImageDataArray {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0);

    const imageData: ImageData = ctx.getImageData(0, 0, img.width, img.height);
    const pixels: ImageDataArray = imageData.data;
    
    return pixels;
};


// Onload event handler for image
const imageOnLoad = function (event: Event) {
    // Get image element from event
    const img: HTMLImageElement = event.target as HTMLImageElement;
    // Display input image in input tag
    displayImage('input-image', img);

    // Get image pixels from image
    const pixels = getImagePixels(img);

    // Display loading cursor
    document.body.style.cursor = "wait";
    
    // Disable input tag
    const uploadImage: HTMLInputElement = document.getElementById('upload-image-element') as HTMLInputElement;
    uploadImage.disabled = true;
    uploadImage.style.cursor = "not-allowed";

    // Create worker and pass sorting of image to new thread
    const worker = new Worker(new URL('./pixelWorker.ts', import.meta.url), { type: 'module'});
    worker.postMessage({ pixels, width: img.width, height: img.height } as WorkerInput);

    worker.onmessage = (e: MessageEvent) => {
        const { sortedPixels, width, height }: WorkerOutput = e.data;

        // Initialize new imageData object to store sorted pixels
        const sortedImageData: ImageData = new ImageData(new Uint8ClampedArray(sortedPixels), width, height);
        const outputImage = imageDataToImage(sortedImageData);
        displayImage('sorted-pixel-image', outputImage);

        document.body.style.cursor = "default";

        // Re-enable input tag
        const uploadImage: HTMLInputElement = document.getElementById('upload-image-element') as HTMLInputElement;
        uploadImage.style.cursor = "default";
        uploadImage.disabled = false;
        worker.terminate();
    }
};


// Main async function to handle files on upload
const handleFileUpload = function (event: React.ChangeEvent<HTMLInputElement>) {
    const file: File = event.target.files?.[0]!;
    if (!file) return;

    const img: HTMLImageElement = new Image();
    img.src = URL.createObjectURL(file);

    img.addEventListener('load', imageOnLoad);
};

export { handleFileUpload, squaredDistanceToBlack };