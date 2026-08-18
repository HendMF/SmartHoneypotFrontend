import { useMemo } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import worldData from "world-atlas/countries-110m.json";

import "../../styles/world-attack-map.css";

const mockOrigins = [
  {
    id: "origin-001",
    country: "Germany",
    coordinates: [10.4515, 51.1657],
    attacks: 42,
  },
  {
    id: "origin-002",
    country: "United States",
    coordinates: [-95.7129, 37.0902],
    attacks: 31,
  },
  {
    id: "origin-003",
    country: "Russia",
    coordinates: [105.3188, 61.524],
    attacks: 27,
  },
  {
    id: "origin-004",
    country: "India",
    coordinates: [78.9629, 20.5937],
    attacks: 24,
  },
  {
    id: "origin-005",
    country: "Egypt",
    coordinates: [30.8025, 26.8206],
    attacks: 18,
  },
];

const width = 1000;
const height = 500;

function WorldAttackMap() {
  const countries = useMemo(() => {
    return feature(
      worldData,
      worldData.objects.countries
    ).features;
  }, []);

  const projection = useMemo(() => {
    return geoMercator()
      .scale(155)
      .translate([width / 2, height / 1.55]);
  }, []);

  const pathGenerator = useMemo(() => {
    return geoPath().projection(projection);
  }, [projection]);

  return (
    <section className="world-attack-map">
      <div className="world-attack-map__header">
        <div>
          <span className="world-attack-map__eyebrow">
            Geographic Intelligence
          </span>

          <h3 className="world-attack-map__title">
            World Attack Map
          </h3>
        </div>

        <div className="world-attack-map__legend">
          <span className="world-attack-map__legend-dot" />
          Attack Origin
        </div>
      </div>

      <div className="world-attack-map__body">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="world-attack-map__svg"
          role="img"
          aria-label="World map showing attack origins"
        >
          <g>
            {countries.map((country) => (
              <path
                key={country.id}
                d={pathGenerator(country)}
                className="world-map-country"
              />
            ))}
          </g>

          <g>
            {mockOrigins.map((origin) => {
              const [x, y] = projection(
                origin.coordinates
              );

              if (
                !Number.isFinite(x) ||
                !Number.isFinite(y)
              ) {
                return null;
              }

              return (
                <g
                  key={origin.id}
                  className="world-map-origin"
                >
                  <circle
                    cx={x}
                    cy={y}
                    r="11"
                    className="world-map-marker-pulse"
                  />

                  <circle
                    cx={x}
                    cy={y}
                    r="4"
                    className="world-map-marker"
                  />

                  <title>
                    {origin.country}: {origin.attacks} attacks
                  </title>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      <div className="world-attack-map__footer">
        <span>
          {mockOrigins.length} monitored origins
        </span>

        <span>
          Mock GeoIP data
        </span>
      </div>
    </section>
  );
}

export default WorldAttackMap;
