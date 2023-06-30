import axios from 'axios'

const createServer = async () => {

  try {
    const response = await axios.post(
      'https://api.upcloud.com/1.3/server',
      {
        server: {
          hostname: 'my-server',
          plan: '1xCPU-1GB',
          zone: 'fi-hel1',
          storage_devices: {
            storage_device: [
              {
                action: 'clone',
                storage: 10,
                tier: 'maxiops',
              },
            ],
          },
          login_user: {
            create_password: 'yes',
          },
          storage_devices: {
            storage_device: [
              {
                action: 'clone',
                title: 'root',
                size: 10,
                tier: 'maxiops',
                filesystem: 'ext4',
              },
            ],
          },
          boot_order: ['disk'],
          video_model: 'vga',
          remote_access_type: 'vnc',
        },
      },
      {
        auth: {
          username: process.env.UPCLOUD_USERNAME,
          password: process.env.UPCLOUD_PASSWORD,
        },
      }
    );

    console.log(response.data);
    alert('Máy chủ đã được tạo thành công!');
  } catch (error) {
    console.error(error);
    alert('Đã xảy ra lỗi khi tạo máy chủ!');
  }
};