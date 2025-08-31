import { handleFileUpload } from "../utilities/imageUtils";


function PageTitleSection() {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">Image Pixel Sorter!!!</h1>
            <p className="mb-8">Sort your image's pixels here!</p>
        </div>
    );
}


function InputPixelsSection() {
    return (
        <div className="w-full lg:w-2/5 flex flex-col h-full">
            <h2 className="text-xl font-bold pb-4">Input Pixels:</h2>
            <img className="w-full pb-2" id="input-image" style={{ display: "none" }} />
            <input id="upload-image-element" className="mb-16 lg:m-0 file:[all:revert]" type="file" multiple={false} accept="image/*" onChange={handleFileUpload} />
        </div>
    );
}


function SortedPixelSection() {
    return (
        <div className="w-full lg:w-2/5 flex flex-col h-full">
            <h2 className="text-xl font-bold pb-4">Sorted Pixels:</h2>
            <img className="w-full" id="sorted-pixel-image" style={{ display: "none" }} />
        </div>
    );
}


export function ImageSelectionPage() {
    return (
        <main className="flex justify-center w-screen h-screen pt-16 pb-4">
            <div className="flex flex-col w-full h-full items-center">
                <PageTitleSection />
                <div className="w-4/5 h-4/5 justify-around flex flex-col lg:flex-row">
                    <InputPixelsSection />
                    <SortedPixelSection />
                </div>
            </div>
        </main>
    );
}