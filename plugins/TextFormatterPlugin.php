<?php

declare(strict_types=1);

namespace Datashaman\Tongs\Plugins;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;
use Parsedown;
use s9e\TextFormatter\Bundles\Fatdown as TextFormatter;

final class TextFormatterPlugin extends Plugin
{
    public function handle(Collection $files, callable $next): Collection
    {
        $files = $files
            ->mapWithKeys(
                function ($file, $path) {
                    if (File::extension($path) === 'md') {
                        return $this->transform($file, $path);
                    }

                    return [
                        $path => $file,
                    ];
                }
            );

        return $next($files);
    }

    protected function transform(array $file, string $path): array
    {
        $xml = TextFormatter::parse($file['contents']);
        $file['contents'] = TextFormatter::render($xml);
        $path = preg_replace('/\.md$/', '.html', $path);

        return [
            $path => $file,
        ];
    }
}
