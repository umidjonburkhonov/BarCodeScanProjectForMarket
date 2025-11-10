import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { FocusIcon, RefreshCcw, PlusIcon, MinusIcon } from "lucide-react";

export default function Scanner({ onDetected }) {
    const videoRef = useRef(null);
    const [isActive, setIsActive] = useState(true);
    const [track, setTrack] = useState(null);
    const [focusing, setFocusing] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [zoomSupported, setZoomSupported] = useState(false);
    const zoomStep = 0.2;
    const maxZoom = 3;

    useEffect(() => {
        if (!isActive) return;

        const reader = new BrowserMultiFormatReader();
        let controls;

        async function startScanner() {
            try {
                controls = await reader.decodeFromVideoDevice(
                    null,
                    videoRef.current,
                    (result, err) => {
                        if (result) {
                            const code = result.getText();
                            onDetected?.(code);
                            setIsActive(false);
                            controls?.stop?.();
                        }
                    }
                );

                // Kamera stream va autofocus
                const stream = videoRef.current.srcObject;
                const t = stream?.getVideoTracks?.()[0];
                setTrack(t);

                if (t?.getCapabilities) {
                    const caps = t.getCapabilities();
                    if (caps.focusMode) {
                        await t.applyConstraints({
                            advanced: [{ focusMode: "continuous" }],
                        });
                    }
                }
            } catch (err) {
                console.error("Camera error:", err);
            }
        }

        startScanner();
        return () => controls?.stop?.();
    }, [isActive, onDetected]);

    // Fokusni qayta yoqish uchun button
    const handleFocus = async () => {
        if (!track) return;
        try {
            setFocusing(true);
            const caps = track.getCapabilities();
            if (caps.focusMode) {
                await track.applyConstraints({
                    advanced: [{ focusMode: "manual" }],
                });
                // 0.5 soniyadan so‘ng continuous rejimga qaytar
                setTimeout(async () => {
                    await track.applyConstraints({
                        advanced: [{ focusMode: "continuous" }],
                    });
                    setFocusing(false);
                }, 500);
            }
        } catch (e) {
            console.warn("Fokusni tiklash ishlamadi:", e);
            setFocusing(false);
        }
    };


    // Zoom o‘zgarishi
    const changeZoom = async (delta) => {
        if (!track && !videoRef.current) return;

        const newZoom = Math.min(Math.max(zoom + delta, 1), maxZoom);
        setZoom(newZoom);

        try {
            if (zoomSupported) {
                await track.applyConstraints({
                    advanced: [{ zoom: newZoom }],
                });
            } else {
                // fallback — CSS transform orqali zoomni vizual simulyatsiya qilish
                videoRef.current.style.transform = `scale(${newZoom})`;
                videoRef.current.style.transition = "transform 0.2s ease";
            }
        } catch (e) {
            console.warn("Zoom ishlamadi:", e);
        }
    };


    return (
        <div className="w-full flex flex-col items-center space-y-3">
            {isActive ? (
                <>
                    <div className="relative w-64 sm:w-72 h-56 sm:h-64 border-2 border-green-500 rounded-2xl overflow-hidden shadow-md">
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            playsInline
                        />

                        {/* Fokusni tiklash tugmasi */}
                        <button
                            onClick={handleFocus}
                            disabled={focusing}
                            className={`absolute bottom-2 right-2 flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg text-white font-medium shadow-md transition ${focusing
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700"
                                }`}
                        >
                            <FocusIcon className="w-4 h-4" />
                            {focusing ? "Фокусировка..." : "Восстановить фокус"}
                        </button>
                    </div>

                    {/* Zoom tugmalari (har doim chiqadi) */}
                    <div className="flex items-center justify-center gap-5 mt-2">
                        <button
                            onClick={() => changeZoom(-zoomStep)}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-3 shadow-md active:scale-95 transition"
                        >
                            <MinusIcon className="w-5 h-5" />
                        </button>

                        <span className="text-gray-700 font-semibold text-sm w-10 text-center">
                            {zoom.toFixed(1)}x
                        </span>

                        <button
                            onClick={() => changeZoom(zoomStep)}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-3 shadow-md active:scale-95 transition"
                        >
                            <PlusIcon className="w-5 h-5" />
                        </button>
                    </div>
                </>
            ) : (
                <button
                    onClick={() => {
                        setIsActive(true);
                        setFocusing(false);
                    }}
                    className="flex items-center gap-2 mt-5 px-4 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium shadow transition"
                >
                    <RefreshCcw className="w-4 h-4" />
                    Повторное сканирование
                </button>
            )}
        </div>
    );
}


// ///////////////////////////////////////////////////////////////////////////////////////////////////////
// import { useEffect, useRef, useState } from "react";
// import { BrowserMultiFormatReader } from "@zxing/browser";
// import { FocusIcon, RefreshCcw, PlusIcon, MinusIcon } from "lucide-react";

// export default function Scanner({ onDetected }) {
//     const videoRef = useRef(null);
//     const [isActive, setIsActive] = useState(true);
//     const [track, setTrack] = useState(null);
//     const [focusing, setFocusing] = useState(false);
//     const [zoom, setZoom] = useState(1);
//     const [zoomSupported, setZoomSupported] = useState(false);
//     const zoomStep = 0.2;
//     const maxZoom = 3;

//     useEffect(() => {
//         if (!isActive) return;
//         const reader = new BrowserMultiFormatReader();
//         let controls;

//         async function startScanner() {
//             try {
//                 controls = await reader.decodeFromVideoDevice(
//                     null,
//                     videoRef.current,
//                     (result, err) => {
//                         if (result) {
//                             const code = result.getText();
//                             onDetected?.(code);
//                             setIsActive(false);
//                             controls?.stop?.();
//                         }
//                     }
//                 );

//                 const stream = videoRef.current.srcObject;
//                 const t = stream?.getVideoTracks?.()[0];
//                 setTrack(t);

//                 if (t?.getCapabilities) {
//                     const caps = t.getCapabilities();
//                     if (caps.zoom) {
//                         setZoomSupported(true);
//                         setZoom(caps.zoom.min || 1);
//                     }

//                     if (caps.focusMode) {
//                         await t.applyConstraints({
//                             advanced: [{ focusMode: "continuous" }],
//                         });
//                     }
//                 }
//             } catch (err) {
//                 console.error("Camera error:", err);
//             }
//         }

//         startScanner();
//         return () => controls?.stop?.();
//     }, [isActive, onDetected]);

//     // Fokusni qayta tiklash
//     const handleFocus = async () => {
//         if (!track) return;
//         try {
//             setFocusing(true);
//             const caps = track.getCapabilities();
//             if (caps.focusMode) {
//                 await track.applyConstraints({ advanced: [{ focusMode: "manual" }] });
//                 setTimeout(async () => {
//                     await track.applyConstraints({
//                         advanced: [{ focusMode: "continuous" }],
//                     });
//                     setFocusing(false);
//                 }, 400);
//             }
//         } catch (e) {
//             console.warn("Fokus ishlamadi:", e);
//             setFocusing(false);
//         }
//     };

//     // Zoom o‘zgarishi
//     const changeZoom = async (delta) => {
//         if (!track && !videoRef.current) return;

//         const newZoom = Math.min(Math.max(zoom + delta, 1), maxZoom);
//         setZoom(newZoom);

//         try {
//             if (zoomSupported) {
//                 await track.applyConstraints({
//                     advanced: [{ zoom: newZoom }],
//                 });
//             } else {
//                 // fallback — CSS transform orqali zoomni vizual simulyatsiya qilish
//                 videoRef.current.style.transform = `scale(${newZoom})`;
//                 videoRef.current.style.transition = "transform 0.2s ease";
//             }
//         } catch (e) {
//             console.warn("Zoom ishlamadi:", e);
//         }
//     };

//     return (
//         <div className="w-full flex flex-col items-center space-y-4">
//             {isActive ? (
//                 <>
//                     {/* Kamera oynasi */}
//                     <div className="relative w-72 sm:w-80 h-64 sm:h-72 border-2 border-green-500 rounded-2xl overflow-hidden shadow-md">
//                         <video
//                             ref={videoRef}
//                             className="w-full h-full object-cover"
//                             autoPlay
//                             muted
//                             playsInline
//                         />

//                         {/* Fokus tugmasi */}
//                         <button
//                             onClick={handleFocus}
//                             disabled={focusing}
//                             className={`absolute bottom-2 right-2 flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg text-white font-medium shadow-md transition ${focusing
//                                 ? "bg-gray-400 cursor-not-allowed"
//                                 : "bg-green-600 hover:bg-green-700"
//                                 }`}
//                         >
//                             <FocusIcon className="w-4 h-4" />
//                             {focusing ? "Фокус..." : "Фокус"}
//                         </button>
//                     </div>

//                     {/* Zoom tugmalari (har doim chiqadi) */}
//                     <div className="flex items-center justify-center gap-5 mt-2">
//                         <button
//                             onClick={() => changeZoom(-zoomStep)}
//                             className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-3 shadow-md active:scale-95 transition"
//                         >
//                             <MinusIcon className="w-5 h-5" />
//                         </button>

//                         <span className="text-gray-700 font-semibold text-sm w-10 text-center">
//                             {zoom.toFixed(1)}x
//                         </span>

//                         <button
//                             onClick={() => changeZoom(zoomStep)}
//                             className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-3 shadow-md active:scale-95 transition"
//                         >
//                             <PlusIcon className="w-5 h-5" />
//                         </button>
//                     </div>
//                 </>
//             ) : (
//                 <button
//                     onClick={() => {
//                         setIsActive(true);
//                         setFocusing(false);
//                     }}
//                     className="flex items-center gap-2 mt-5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium shadow transition"
//                 >
//                     <RefreshCcw className="w-4 h-4" />
//                     Сканировать снова
//                 </button>
//             )}
//         </div>
//     );
// }
