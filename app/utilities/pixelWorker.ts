import { squaredDistanceToBlack } from "./imageUtils";

self.onmessage = (e: MessageEvent) => {
    const { pixels, width, height } = e.data;

    // Initialize list containing pixel differences
    const pixelDifferences: { idx: number; distance: number }[] = []
    for (let i = 0; i < pixels.length; i += 4) {
        const distance = squaredDistanceToBlack(pixels[i], pixels[i+1], pixels[i+2]);
        pixelDifferences.push({idx: i, distance: distance});
    }

    // Sort pixelDifferences based on squared distance of each pixel to black
    pixelDifferences.sort((a, b) => b.distance - a.distance);

    // Initialize new imageData object to store sorted pixels
    const sortedImageData: ImageData = new ImageData(width, height);
    const sortedPixels: ImageDataArray = sortedImageData.data;

    // Put sorted pixels back
    for (let i = 0; i < pixelDifferences.length; i++) {
        sortedPixels[i * 4] = pixels[pixelDifferences[i].idx];
        sortedPixels[i * 4 + 1] = pixels[pixelDifferences[i].idx + 1];
        sortedPixels[i * 4 + 2] = pixels[pixelDifferences[i].idx + 2];
        sortedPixels[i * 4 + 3] = pixels[pixelDifferences[i].idx + 3];
    }

    self.postMessage({ sortedPixels, width, height });
}