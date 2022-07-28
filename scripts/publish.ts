import { execSync } from 'child_process'
import consola from 'consola'
import path from 'path'

async function run() {
  try {
    await execSync('npm run rollup')
    execSync('npm publish --access public', { stdio: 'inherit', cwd: path.resolve(__dirname, '..') })
    consola.success('Published')
  }
  catch (error) {
    consola.error(error)
    process.exit(1)
  }
}

if (require.main === module)
  run()
