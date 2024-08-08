import { LabelListProps } from "./types.ts";

function LabelList({ labels }: LabelListProps) {
  return (
    <>
      {!labels.length ? (
        <div> no labels</div>
      ) : (
        <ul>
          {labels.map((label) => (
            <li>{label.name}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default LabelList;
