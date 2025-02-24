import cron from "node-cron";
import productService from "../product/product.service.js";
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js'; 
import utc from 'dayjs/plugin/utc.js'; 

dayjs.extend(utc);
dayjs.extend(timezone);

const thaiTime = dayjs().tz("Asia/Bangkok").format("DD-MM-YYYY HH:mm:ss");
console.log("thaiTime", thaiTime);


export const checkLowStock = (io) => {
    cron.schedule("*/20 * * * * *", async () => {
        console.log("Checking low stock products...");

        try {
            const result = await new productService().lowstockproducts();
            
            if (result.length) {
                 const productsWithTimezone = result.map(product => ({
                                ...product,
                                CreatedAt: product.CreatedAt 
                                    ? dayjs(product.CreatedAt).tz("Asia/Bangkok").format("DD-MM-YYYY HH:mm:ss") 
                                    : null
                            }));
                // console.log("สินค้าใกล้หมด:", productsWithTimezone);
                io.emit("low-stock-alert", productsWithTimezone);
            } else {
                console.log("ไม่พบสินค้าใกล้หมด");
            }
        } catch (error) {
            console.error("Failed to fetch low stock products:", error.message);
        }
    });
};