package com.pocketdev.idxwrapper

import android.annotation.SuppressLint
import android.os.Bundle
import android.webkit.*
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView
    private val DESKTOP_USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    private val IDX_URL = "https://idx.google.com"

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        webView = WebView(this)
        setContentView(webView)

        configureWebView()
        webView.loadUrl(IDX_URL)
    }

    private fun configureWebView() {
        val settings = webView.settings
        
        // 1. Modo Desktop Permanente
        settings.userAgentString = DESKTOP_USER_AGENT
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.databaseEnabled = true
        
        // 2. Configurações de Visualização e Zoom
        settings.useWideViewPort = true
        settings.loadWithOverviewMode = true
        settings.builtInZoomControls = true
        settings.displayZoomControls = false // Esconde os botões +/- feios
        settings.setSupportZoom(true)

        // 3. Persistência de Cache
        settings.cacheMode = WebSettings.LOAD_DEFAULT
        
        webView.webViewClient = object : WebViewClient() {
            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                // Injetar o script de ajuda após o carregamento
                injectHelperScript()
            }

            // Evitar que links externos abram fora do app
            override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                return false 
            }
        }

        // 4. Interface para comunicação JS -> Nativo (opcional)
        webView.addJavascriptInterface(WebAppInterface(), "Android")
    }

    private fun injectHelperScript() {
        val script = """
            // O conteúdo do idx_helper.js seria lido e injetado aqui
            (function() {
                console.log("Script injetado via Kotlin!");
                // ... (código do idx_helper.js)
            })();
        """.trimIndent()
        webView.evaluateJavascript(script, null)
    }

    // Prevenir que o botão 'voltar' feche o app se houver histórico no WebView
    override fun onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }

    inner class WebAppInterface {
        @JavascriptInterface
        fun showToast(message: String) {
            // Exemplo de como o JS pode chamar código nativo
        }
    }
}
