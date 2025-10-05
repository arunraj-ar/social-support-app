// Tailwind CSS based light and dark theme configurations
export const lightTheme = {
  colors: {
    danger: "text-red-600",
    warning: "text-amber-600",
    success: "text-emerald-600",
    info: "text-blue-600",
  },
  backgrounds: {
    danger: "bg-red-500 hover:bg-red-600",
    warning: "bg-amber-400 hover:bg-amber-500",
    success: "bg-emerald-500 hover:bg-emerald-600",
    info: "bg-blue-500 hover:bg-blue-600",
  },
  layers: {
    base: "bg-white text-gray-900",
    surface: "bg-gray-50 text-gray-900",
    muted: "bg-gray-100 text-gray-800",
    elevated: "bg-gray-200 text-gray-900",
  },
  buttons: {
    base: "px-4 py-2 font-semibold rounded-md transition",
    danger: "bg-red-500 text-white hover:bg-red-600",
    warning: "bg-amber-400 text-black hover:bg-amber-500",
    success: "bg-emerald-500 text-white hover:bg-emerald-600",
    info: "bg-blue-500 text-white hover:bg-blue-600",
    disabled: "bg-gray-100 text-gray-800",
  },
  card: "rounded-lg shadow-md p-4 bg-white border border-gray-100",
  app: "bg-gray-50 text-gray-900",
};

export const darkTheme = {
  colors: {
    danger: "text-red-400",
    warning: "text-amber-300",
    success: "text-emerald-400",
    info: "text-blue-400",
  },
  backgrounds: {
    danger: "bg-red-600 hover:bg-red-700",
    warning: "bg-amber-500 hover:bg-amber-600",
    success: "bg-emerald-600 hover:bg-emerald-700",
    info: "bg-blue-600 hover:bg-blue-700",
  },
  layers: {
    base: "bg-[#121212] text-gray-100",
    surface: "bg-[#1e1e1e] text-gray-100",
    muted: "bg-[#2a2a2a] text-gray-200",
    elevated: "bg-[#333333] text-gray-100",
  },
  buttons: {
    base: "px-4 py-2 font-semibold rounded-md transition",
    danger: "bg-red-600 text-white hover:bg-red-700",
    warning: "bg-amber-500 text-black hover:bg-amber-600",
    success: "bg-emerald-600 text-white hover:bg-emerald-700",
    info: "bg-blue-600 text-white hover:bg-blue-700",
    disabled: "bg-[#2a2a2a] text-gray-200",
  },
  card: "rounded-lg shadow-lg p-4 bg-neutral-800 border border-neutral-700",
  app: "bg-[#242424] text-white",
};
