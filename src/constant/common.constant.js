export const ORDER_STATUS_MAP = {
  success: "Thành công",
  waiting_confirm: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  reject: "Đã hủy",
};

export const PAYMENT_METHOD_MAP = {
  offline: "Thanh toán khi nhận hàng",
  online: "VNPAY",
};

/**
 * @example numberFormatText(1000, 5) => 1,000
 * @example numberFormatText(1000.123, 5) => 1,000.123
 * @example numberFormatText(1000.123456, 3) => 1,000.123
 * @example numberFormatText(1000.123456, 5) => 1,000.12346
 */
export const numberFormatText = (value, fixed = 5) => {
  if (["", null].includes(value) || isNaN(Number(value))) return "";

  const formattedValue = Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: fixed,
  });

  return formattedValue;
};
