import GoogleMapContainer from "./GoogleMapContainer";

interface MapPanelProps {
  isMobile: boolean
}

export function MapPanel({ isMobile }: MapPanelProps) {
  return (
    <div style={{ width: "100%", height: "100%", zIndex: 100 }}>
      <GoogleMapContainer isMobile={isMobile} />
    </div>
  );
}
