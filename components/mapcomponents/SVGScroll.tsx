import {
  SVG_ATTRS,
  FEATURES_GROUP_ID,
  POINTS_GROUP_ID,
  LABEL_POINTS_GROUP_ID,
  STATE_FEATURES,
  POINTS,
  LABEL_POINTS,
} from "./indiaStatesData";

const SVGScroll = () => {
  return (
    <div>
      <svg {...SVG_ATTRS}>
        <g id={FEATURES_GROUP_ID}>
          {STATE_FEATURES.map((f) => (
            <path key={f.id} d={f.d} id={f.id} name={f.name}></path>
          ))}
        </g>
        <g id={POINTS_GROUP_ID}>
          {POINTS.map((p) => (
            <circle
              key={p.id}
              className={p.className}
              cx={p.cx}
              cy={p.cy}
              id={p.id}
            ></circle>
          ))}
        </g>
        <g id={LABEL_POINTS_GROUP_ID}>
          {LABEL_POINTS.map((p) => (
            <circle
              key={p.id}
              className={p.className}
              cx={p.cx}
              cy={p.cy}
              id={p.id}
            ></circle>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default SVGScroll;
