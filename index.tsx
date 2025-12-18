
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Không tìm thấy phần tử root để khởi chạy ứng dụng");
}

// Kiểm tra xem root đã được tạo trước đó chưa (để tránh lỗi trong môi trường HMR)
let root: ReactDOM.Root;
if ((window as any)._reactRoot) {
  root = (window as any)._reactRoot;
} else {
  root = ReactDOM.createRoot(rootElement);
  (window as any)._reactRoot = root;
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
