/*
* last update: 2006-08-24
*/

editAreaLoader.load_syntax["xml"] = {
	'COMMENT_SINGLE' : {}
	,'COMMENT_MULTI' : {'<!--' : '-->'}
	,'QUOTEMARKS' : {1: "'", 2: '"'}
	,'KEYWORD_CASE_SENSITIVE' : false
	,'KEYWORDS' : {
	}
	,'OPERATORS' :[
	]
	,'DELIMITERS' :['<', '>'
	]
	,'REGEXPS' : {
		'xml' : {
			'search' : '()(<\\?[^>]*?\\?>)()'
			,'class' : 'xml'
			,'modifiers' : 'g'
			,'execute' : 'before' // before or after
		}
		,'cdatas' : {
			'search' : '()(<!\\[CDATA\\[.*?\\]\\]>)()'
			,'class' : 'cdata'
			,'modifiers' : 'g'
			,'execute' : 'before' // before or after
		}
		,'tags' : {
			'search' : '(<)(/?[a-z][^ \r\n\t>]*)([^>]*>)'
			,'class' : 'tags'
			,'modifiers' : 'gi'
			,'execute' : 'before' // before or after
		}
		,'attributes' : {
			'search' : '( |\n|\r|\t)([^ \r\n\t=]+)(=)'
			,'class' : 'attributes'
			,'modifiers' : 'g'
			,'execute' : 'before' // before or after
		}
	}
	,'STYLES' : {
		'COMMENTS': 'color: #008000;'
		,'QUOTESMARKS': 'color: #0000ff;'
		,'KEYWORDS' : {
			}
		,'OPERATORS' : 'color: #0000ff;'
		,'DELIMITERS' : ''
		,'REGEXPS' : {
			'attributes': 'color: #ff0000;'
			,'tags': 'color: #A31515;'
			,'xml': 'color: #A31515;'
			,'cdata': 'color: #808080;'
		}	
	}		
};
