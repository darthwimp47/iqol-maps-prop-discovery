interface MainLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export default function MainLayout({ left, right }: MainLayoutProps) {
  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <div
        style={{
          flex: 1,
          borderRight: "1px solid #e0e0e0",
          overflow: "hidden",
        }}
      >
        {left}
      </div>

      <div
        style={{
          width: "50%",
          height: "100%",
          overflowY: "auto",
          background: "#ffffff",
        }}
      >
        {right}
      </div>
    </div>
  );
}

