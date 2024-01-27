import { IsArray, IsString } from 'class-validator';

class DownloadTypes {
  provedorName: string;
  linkDownload: string;
}

export class CreateMovieDto {
  /**
   * Nome do filme
   * @example Transformers
   * */
  @IsString()
  name: string;

  /**
   * Descrição do filme
   * @example descreva sobre o filme
   * */
  @IsString()
  description: string;

  /**
   * Banner do filme
   * @example https://bannerexample.com.br
   * */
  @IsString()
  bannerUrl: string;

  /**
   * Imagem do filme
   * @example https://imageexample.com.br
   * */
  @IsString()
  imageUrl: string;

  /**
   * Link do trailer do filme
   * @example https://linktrailerexample.com.br
   * */
  @IsString()
  trailerLink: string;

  /**
   * Id da categoria do filme
   * @example 64920ec1-6c6e-420e-adb1-e015de39cc96
   * */
  @IsString()
  categoryId: string;

  /**
   * Ano de lançamento do filme
   * @example 2024
   * */
  @IsString()
  releaseYear: string;

  @IsArray()
  downloads: DownloadTypes[];
}
