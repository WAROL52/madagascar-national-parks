/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // modularizeImports: {
  //   "@mui/material": {
  //     transform: "@mui/material/{{member}}",
  //   },
  //   "@mui/icons-material": {
  //     transform: "@mui/icons-material/{{member}}",
  //   },
  //   "@mui/x-data-grid": {
  //     transform: "@mui/x-data-grid/{{member}}",
  //   },
  //   "react-bootstrap": {
  //     transform: "react-bootstrap/{{member}}",
  //   },
  // },
};
// @mui/x-data-grid
module.exports = nextConfig;
