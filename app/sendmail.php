<?php
if (array_key_exists('textmess', $_POST)) {
  mail ("oleg02.12.89@gmail.com",
        "заполнена контактная форма с ".$_SERVER['HTTP_REFERER'],
        "Имя: ".$_POST['username']."\nEmail: ".$_POST['usermail']."\nСообщение: ".$_POST['textmess']);
  echo $_POST['username'];
}
?>