import { BadRequestException, Injectable } from '@nestjs/common';
import crypto from 'crypto';

@Injectable()
export class PwnedService {
  async hasLeaked(password: string): Promise<boolean> {
    try {
      const sha1Hash = crypto
        .createHash('sha1')
        .update(password)
        .digest('hex')
        .toUpperCase();
      const prefix = sha1Hash.substring(0, 5);
      const suffix = sha1Hash.substring(5);

      const response = await this.fetchFromPwned(prefix);

      const hashes = response.split('\n').map((line) => line.split(':')[0]);

      return hashes.includes(suffix);
    } catch (error) {
      throw new BadRequestException(`Failed to fetch data`);
    }
  }

  private async fetchFromPwned(prefix: string): Promise<string> {
    try {
      const response = await fetch(
        `https://api.pwnedpasswords.com/range/${prefix}`,
        {
          headers: { accept: 'application/json', method: 'GET' },
        }
      );

      if (!response.ok) {
        throw new BadRequestException(`HTTP Error ${response.status}`);
      }

      const text = await response.text();
      return text;
    } catch (error) {
      throw new BadRequestException(`Failed to fetch data`);
    }
  }
}
