import React from "react";

export default function LogoCloud() {
  return (
    <section className="bg-white py-16 border-y border-gray-100">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center text-sm font-semibold tracking-wider text-gray-400 uppercase">
          Didukung & Terintegrasi Dengan Layanan Terpercaya
        </h2>
        <div className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16 opacity-60 grayscale hover:opacity-80 transition-opacity duration-300">
          {/* WhatsApp */}
          <div className="flex items-center gap-2">
            <svg
              className="h-6 w-6 text-[#25D366] fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-20.372c-.224-.499-.46-.509-.675-.518-.216-.01-.462-.01-.709-.01-.246 0-.647.092-.986.462-.338.37-1.293 1.262-1.293 3.08 0 1.817 1.324 3.57 1.508 3.818.185.247 2.607 3.98 6.315 5.584.882.381 1.57.609 2.108.779.887.282 1.694.242 2.333.146.712-.107 2.193-.896 2.501-1.763.308-.867.308-1.61.216-1.763-.092-.153-.338-.243-.709-.427-.37-.185-2.193-1.082-2.532-1.205-.339-.124-.586-.185-.832.185-.246.37-.955 1.205-1.17 1.451-.216.247-.431.277-.801.092-.37-.185-1.564-.577-2.98-1.839-1.101-.981-1.844-2.194-2.06-2.564-.216-.37-.023-.57.162-.754.166-.166.37-.431.554-.647.185-.216.246-.37.369-.617.123-.247.062-.463-.03-.647-.093-.185-.675-1.63-.935-2.257z" />
            </svg>
            <span className="font-bold text-gray-800 text-lg">WhatsApp</span>
          </div>

          {/* Google */}
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                fill="#EA4335"
              />
            </svg>
            <span className="font-bold text-gray-800 text-lg">Google</span>
          </div>

          {/* QRIS */}
          <div className="flex flex-col items-center">
            <span className="text-xl font-extrabold tracking-tight text-red-600 font-serif">
              QR<span className="text-teal-600">IS</span>
            </span>
          </div>

          {/* Bank BCA */}
          <div className="text-xl font-black italic text-blue-800">
            BCA
          </div>

          {/* Bank Mandiri */}
          <div className="text-xl font-bold italic text-blue-900 flex items-center">
            mandırı
          </div>

          {/* Bank BRI */}
          <div className="text-xl font-extrabold text-blue-700 flex items-center">
            BRI
          </div>

          {/* GoPay */}
          <div className="text-xl font-extrabold text-blue-500">
            go<span className="text-teal-400">pay</span>
          </div>

          {/* OVO */}
          <div className="text-xl font-extrabold text-purple-700">
            ovo
          </div>
        </div>
      </div>
    </section>
  );
}
