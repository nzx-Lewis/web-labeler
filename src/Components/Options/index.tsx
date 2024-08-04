import { Container } from "@mantine/core";
import { OptionsProps } from "./types.ts";

function Options({ labels, isLoading }: OptionsProps) {
  return (
    <Container>
      {isLoading ? (
        "is loading..."
      ) : (
        <div>
          <span>Labels:</span>
          <ul>
            {labels.map((label) => (
              <li>{label.name}</li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
}

export default Options;
