import { handleFileUpload } from "../utilities/image_utils";

function InputSection() {
    return (
        <div className="w-full lg:w-2/5 grid grid-rows-24 h-full">
            <h1 className="row-span-1">Input Section</h1>
            <input className="row-span-1" type="file" multiple={false} accept="image/*" onChange={handleFileUpload} />
            <img className="row-start-3 row-span-22" id="input-image" style={{ display: "none" }} />
        </div>
    );
}

function OutputSection() {
    return (
        <div className="w-full lg:w-2/5 grid grid-rows-24 h-full">
            <h1 className="row-span-1">Output Section</h1>
            <img className="row-start-3 row-span-22" id="output-image" style={{ display: "none" }} />
        </div>
    );
}

export function ImageSelectionPage() {
    return (
        <main className="flex justify-center w-screen h-screen pt-16 pb-4">
            <div className="w-4/5 h-4/5 justify-around flex flex-col lg:flex-row">
                <InputSection />
                <OutputSection />
            </div>
        </main>
    );
}