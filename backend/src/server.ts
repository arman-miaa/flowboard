import app from './app';
import config from './app/config';

async function main() {
  try {
    app.listen(config.port, () => {
      console.log(`🚀 FlowBoard Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
}

main();
