import GoogleMapContainer from "./GoogleMapContainer";

export function MapPanel() {
  return (
    <div style={{ width: "100%", height: "100%", zIndex: 100 }}>
      <GoogleMapContainer />
    </div>
  );
}
