interface circleProps {
  /** Define o width, height e border-radius do círculo */
  size: number; 
  
  /** Cor de fundo. não é necessário ponto e vírgula. */
  backgroundColor: string;

  /**String que entrará no classname */
  className?: string;
}

export default function MainTab(props: circleProps) {
  const className = "circle " + props.className;
  return (
    <div
      className={className}
      style={{
        backgroundColor: props.backgroundColor,
        width: props.size + "px",
        height: props.size + "px",
        borderRadius: props.size + "px"
      }}
    >

    </div>
  );
}
