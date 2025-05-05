import clsx from "clsx";
import CommonIcons from "../commonIcons";

const Loading = ({ className }: { className?: string }) => {
  return (
    <CommonIcons.Loader2 className={clsx("icon animate-spin h-16 w-16 text-primary/60", className)} />
    // <LoaderIcon className="animate-spin" />
    // <Loader2 className={cn("my-28 h-16 w-16 text-primary/60 animate-spin")} />
  );
};

export default Loading;
