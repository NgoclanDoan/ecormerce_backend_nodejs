## S3: 7 điều cần sáng tỏ trong hệ thông

1. Nhược điểm của cách Connect cũ
2. Cách Connect MỚI, khuyên dùng

3. Kiểm tra hệ thống có bao nhiêu Connect?

   > src/helpers/check.connect.js >> countConnect

4. Thông báo khi server quá tải Connect

   > src/helpers/check.connect.js >> checkOverload

5. Có nên disConnect() liên tục hay không?

   Không cần. Vì Mongoose sử dụng Pool, được gọi là một nhóm kết nối để quản lí các CSDL. Nó tự động xử lí mở/ đóng các kết nối khi cần.
   Tuy nhiên, trong TH muốn đóng kết nối rõ ràng, ví dụ: Hệ thống cần tắt "duyên dáng", có thể tắt tất cả các kết nối đang hoạt động để đảm bảo dữ liệu không bị mất.

   ```shell
   process.on("SIGINT", () => {
     server.close(() => {
       console.log("Exit Server Express");
     });
   });
   ```

   ```shell
   mongoose.disconnect();
   ```

6. PoolSize là gì? Vì sao lại quan trọng

   Trong ngữ cảnh của Mongoose, nhóm kết nôi là tập hợp các kết nôi của CSDL, có thể tái sử dụng, duy trì bởi DB.

   Lợi ích:

   - Tăng hiệu suất
   - Khả năng mở rộng của ứng dụng
   - Giảm chi phí DB và đóng kết nối CSDL

7. Nếu vượt quá kết nối PoolSize??

Mongoose xếp hàng các yêu cầu vượt mức cho đến kho có kết nối free


## OS vs Process

## S4. env

1. .env vs config khác nhau?

- config lưu được nhiều định dang, 
- .env: dùng để lưu trữ nhữg cài đặt ứng dụng (thông tin nhạy cảm) có thể kiểm soát được code và phiên bản
