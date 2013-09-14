^.*(GET (/ |/javascripts.+|/stylesheets.+|/.+/test/)|HEAD).*$\n
^.*GET (/.+) HTTP/1\.1.*$
F9
^(.*)(\n\1)+
