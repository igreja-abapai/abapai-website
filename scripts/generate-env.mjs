#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadEnvFile(filePath) {
    if (!fs.existsSync(filePath)) {
        return {};
    }

    const envContent = fs.readFileSync(filePath, 'utf8');
    const env = {};

    envContent.split('\n').forEach((line) => {
        const trimmedLine = line.trim();
        if (trimmedLine && !trimmedLine.startsWith('#')) {
            const [key, ...valueParts] = trimmedLine.split('=');
            if (key && valueParts.length > 0) {
                env[key.trim()] = valueParts.join('=').trim();
            }
        }
    });

    return env;
}

function generateEnvironmentFile(env, isProduction = false) {
    let apiUrl;

    if (isProduction) {
        apiUrl = env.NG_APP_API_BASE_URL;
    } else {
        apiUrl = env.NG_APP_API_BASE_URL || 'http://localhost:4333';
    }

    const content = `export const environment = {
  prod: ${isProduction},
  clientApiBaseUrl: '${apiUrl}',
};
`;
    return content;
}

// Load environment variables from .env file
const envPath = path.join(__dirname, '..', '.env');
const env = loadEnvFile(envPath);

// Override with deployment platform environment variables if they exist
if (process.env.NODE_ENV) {
    env.NODE_ENV = process.env.NODE_ENV;
}
if (process.env.NG_APP_API_BASE_URL) {
    env.NG_APP_API_BASE_URL = process.env.NG_APP_API_BASE_URL;
}

const isProduction = env.NODE_ENV === 'production';

const envContent = generateEnvironmentFile(env, isProduction);

const targetFile = isProduction
    ? 'src/app/shared/environments/environment.production.ts'
    : 'src/app/shared/environments/environment.development.ts';

fs.writeFileSync(targetFile, envContent);
