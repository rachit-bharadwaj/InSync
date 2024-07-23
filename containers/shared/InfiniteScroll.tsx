import { useInView } from "react-intersection-observer";

export default function InfiniteScroll({
  children,
  onBottomReached,
  className,
}: InfiniteScrollProps) {
  const { ref } = useInView({
    rootMargin: "200px",
    onChange: (inView) => {
      if (inView) {
        onBottomReached();
      }
    },
  });

  return (
    <div className={className}>
      {children}

      <div ref={ref} />
    </div>
  );
}
