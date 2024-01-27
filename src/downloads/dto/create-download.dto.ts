import { IsOptional, IsString } from 'class-validator';
import { Download } from '../entities/download.entity';

export class CreateDownloadDto extends Download {
  /**
   * Nome do provedor do download
   * @example Mega
   * */
  @IsString()
  provedorName: string;

  /**
   * Link para download
   * @example http://download.com.br
   * */
  @IsString()
  linkDownload: string;

  /**
   * Id do filme
   * @example ea9d33da-a264-41e5-9fae-b9ee9d40e401
   * */
  @IsOptional()
  @IsString()
  movieId?: string;

  /**
   * Id da serie
   * @example ea9d33da-a264-41e5-9fae-b9ee9d40e401
   * */
  @IsOptional()
  @IsString()
  serieId?: string;
}
