import { CouponListModel } from "@/models/coupons/CouponListModel";
import { useAuth } from "@/providers/AuthProvider";
import { RouteBase } from "@/routes/routeUrl";
import { useGetUserId } from "@/services/user/useGetUserId";
import { useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Fragment } from "react/jsx-runtime";
interface IItemCouponProps {
  data: CouponListModel;
  channelId: string | null;
}
const ItemCoupon = (props: IItemCouponProps) => {
  // !State
  const { data, channelId } = props;
  const { user } = useAuth();
  const ref = useRef<any>(null);
  const [heightImg, setHeightImage] = useState(0);
  const navigate = useNavigate();
  const title = data?.title_1 || data?.title_2 || data?.title_3;
  const { data: dataUser, isLoading } = useGetUserId(user?.userId || "", channelId || "");

  // !Function
  const handleCLick = () => {
    navigate(
      `${RouteBase.DetailCouponScreen}?coupon_id=${data?.id}&channel_id=${channelId}&user_beam_id=${dataUser.user_beam_id}`,
    );
  };

  useLayoutEffect(() => {
    const height = ref.current?.clientHeight;
    setHeightImage(height);
  }, []);

  // !Render
  if (isLoading) {
    return (
      <div className="page fixed bottom-0 left-0 z-[10] flex items-center justify-center bg-bgLoadingApp backdrop-blur-sm">
        <ClipLoader color="rgb(3 199 85)" />
      </div>
    );
  }
  return (
    <div className="flex gap-[12px]">
      {data?.thumbnail ? (
        <div onClick={handleCLick} className="flex-[1] rounded-[8px]">
          <img
            className="rounded-[8px] object-cover w-full"
            style={{ height: `${heightImg}px` }}
            src={data.thumbnail}
          />
        </div>
      ) : (
        <Fragment />
      )}
      <div onClick={handleCLick} className="flex-[2] px-[12px] py-[8px] bg-white rounded-[8px]" ref={ref}>
        {title ? <div className="text-black size20W400H24">{title}</div> : <Fragment />}
        {data?.content ? (
          <div className="text-secondary-secondary500 size12W400H168 mt-[12px] ellipsis2">{data?.content}</div>
        ) : (
          <Fragment />
        )}
      </div>
    </div>
  );
};
export default ItemCoupon;
