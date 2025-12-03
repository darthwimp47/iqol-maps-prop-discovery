// GeoJsonStyles.ts
import metroIcon from "../../assets/metro.png";
import suburbanRailwayIcon from "../../assets/suburban_railway.png";
import powerIcon from "../../assets/power.png";

// ---------- STYLES ----------
export const geoJsonStyles: Record<string, any> = {
  metro_lines: (feature: google.maps.Data.Feature) => {
    const type = feature.getGeometry()?.getType();

    if (type === "Point") {
      return {
        icon: {
          url: metroIcon,
          scaledSize: new google.maps.Size(23, 23),
        },
      };
    }

    if (type === "LineString") {
      const lineColor = feature.getProperty("color") || "#111";
      return {
        strokeColor: lineColor,
        strokeWeight: 4,
      };
    }

    return { visible: false };
  },

  suburb_railway: (feature: google.maps.Data.Feature) => {
    const type = feature.getGeometry()?.getType();

    if (type === "MultiPoint") {
      return {
        icon: {
          url: suburbanRailwayIcon,
          scaledSize: new google.maps.Size(25, 25),
        },
      };
    }

    if (type === "MultiLineString") {
      return {
        strokeColor: "yellow",
        strokeWeight: 2,
      };
    }

    return { visible: false };
  },

  hightension_lines: (feature: google.maps.Data.Feature, zoom: number) => {
    const type = feature.getGeometry()?.getType();

    if (type === "MultiPoint") {
      let visibilityChance = 0;

      if (zoom < 11) visibilityChance = 0;
      else if (zoom < 13) visibilityChance = 0.1;
      else if (zoom < 14) visibilityChance = 0.3;
      else if (zoom < 15) visibilityChance = 0.5;
      else visibilityChance = 1.0;

      const showIcon = Math.random() < visibilityChance;

      return showIcon
        ? {
            icon: {
              url: powerIcon,
              scaledSize: new google.maps.Size(
                zoom >= 16 ? 28 : zoom >= 15 ? 25 : 20,
                zoom >= 16 ? 28 : zoom >= 15 ? 25 : 20
              ),
            },
            zIndex: 5,
          }
        : { visible: false };
    }

    if (type === "MultiLineString") {
      return {
        strokeColor: "#000",
        strokeWeight: zoom >= 15 ? 3 : zoom >= 12 ? 2 : 1,
        strokeOpacity: zoom >= 12 ? 0.9 : 0.6,
        zIndex: 2,
      };
    }

    return { visible: false };
  },
};

// ---------- POPUP HANDLERS ----------
export function handleGeoJsonClick(
  key: string,
  event: google.maps.Data.MouseEvent,
  infoWindow: google.maps.InfoWindow,
  map: google.maps.Map
) {
  const feature = event.feature;
  const type = feature.getGeometry()?.getType();

  let title = "";
  let content = "";

  switch (key) {
    case "metro_lines": {
      const name = feature.getProperty("name") || "-";
      const status = feature.getProperty("status") || "-";
      const grade = feature.getProperty("grade") || "-";
      const line = feature.getProperty("line") || "-";

      if (type === "Point") {
        title = "Metro Station";
        content = `
          <div style="font-family:Outfit;font-size:14px;">
            <strong>Name:</strong> ${name} <br/>
            <strong>Status:</strong> ${status} <br/>
            <strong>Grade:</strong> ${grade} <br/>
            <strong>Line:</strong> ${line} <br/>
          </div>
        `;
      } else {
        title = "Metro Line";
        content = `<strong style="font-family:Outfit;">${name}</strong>`;
      }
      break;
    }

    case "suburb_railway": {
      const name = feature.getProperty("name") || "-";
      const elec = feature.getProperty("electrified") || "-";
      const serv = feature.getProperty("service") || "-";

      if (type === "MultiPoint") {
        title = "Suburban Railway Station";
        content = `<div style="font-family:Outfit;font-size:14px;">
          <strong>Station Name:</strong> ${name} <br/>
        </div>`;
      } else {
        title = "Suburban Railway";
        content = `<div style="font-family:Outfit;font-size:14px;">
          <strong>Electrified:</strong> ${elec} <br/>
          <strong>Service:</strong> ${serv} <br/>
        </div>`;
      }
      break;
    }

    case "hightension_lines": {
      const voltage = feature.getProperty("voltage") || "-";
      title = "High Tension Wire";
      content = `
        <div style="font-family:Outfit;font-size:14px;">
          <strong>Voltage:</strong> ${voltage}
        </div>
      `;
      break;
    }
  }

  infoWindow.setContent(`
    <div style="font-family:Outfit; color:#000; font-size:14px;">
      <h4 style="margin:0 0 6px 0; font-weight:700; font-size:15px; color:#000; text-bold">
        ${title}
      </h4>
      ${content}
    </div>
  `);
  infoWindow.setPosition(event.latLng);
  infoWindow.open(map);
}
