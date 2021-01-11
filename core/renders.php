<?php 
class Renders {
    public static function CSSComponents() {
        $app_dir  = './app/';
        $files = scandir($app_dir);

        foreach($files as $dir) {
            if(
                $dir != '.' 
                && $dir != '..' 
                && @is_file($app_dir . $dir . '/' . $dir . '.css'))
                
                echo '<link rel="stylesheet" href="app/' . $dir . '/' . $dir . '.css?cache=' . time() . '">' . PHP_EOL;
        }
    }
    public static function JSComponents() {
        $app_dir  = './app/';
        $files = scandir($app_dir);

        foreach($files as $dir) {
            if(
                $dir != '.' 
                && $dir != '..' 
                && @is_file($app_dir . $dir . '/' . $dir . '.js'))
                
                echo '<script src="app/' . $dir . '/' . $dir . '.js?cache=' . time() . '"></script>' . PHP_EOL;
        }
    }
    public static function JSTemplateComponentsVar() {
        $app_dir  = './app/';
        $files = scandir($app_dir);

        foreach($files as $dir) {
            if(
                $dir != '.' 
                && $dir != '..' 
                && @is_file($app_dir . $dir . '/' . $dir . '.html'))
                
                echo 'var Template' . str_replace('-', '', ucwords($dir, '-')) . ' = `' . file_get_contents($app_dir . $dir . '/' . $dir . '.html') . '`;' . PHP_EOL;
        }
    }
}