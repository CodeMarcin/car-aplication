import SvgIcon from "@mui/material/SvgIcon";

function LoaderSvg({ width, height }: ISvgCustomIcon) {
  const styles = { width, height };
  return (
    <div className="flex w-full justify-center">
      <SvgIcon viewBox="0 0 100 100" style={{ ...styles }}>
        <circle cx="50" cy="50" fill="none" stroke="#101010" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
          <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
        </circle>
      </SvgIcon>
    </div>
  );
}

export default LoaderSvg;
