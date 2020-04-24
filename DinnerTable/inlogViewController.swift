//
//  inlogViewController.swift
//  DinnerTable
//
//  Created by Koen Frankena on 02/04/2020.
//  Copyright © 2020 DinnerTable. All rights reserved.
//

import WebKit
import UIKit
import Google
import GoogleSignIn

class inlogViewController: UIViewController, GIDSignInUIDelegate, GIDSignInDelegate {
    
    @IBOutlet var webview: WKWebView!
    
    // HERE
    func hexStringToUIColor (hex:String) -> UIColor {
        var cString:String = hex.trimmingCharacters(in: .whitespacesAndNewlines).uppercased()

        if (cString.hasPrefix("#")) {
            cString.remove(at: cString.startIndex)
        }

        if ((cString.count) != 6) {
            return UIColor.gray
        }

        var rgbValue:UInt64 = 0
        Scanner(string: cString).scanHexInt64(&rgbValue)

        return UIColor(
            red: CGFloat((rgbValue & 0xFF0000) >> 16) / 255.0,
            green: CGFloat((rgbValue & 0x00FF00) >> 8) / 255.0,
            blue: CGFloat(rgbValue & 0x0000FF) / 255.0,
            alpha: CGFloat(1.0)
        )
    }
    
    override func viewDidAppear(_ animated: Bool) {
        if #available(iOS 13.0, *) {
            let app = UIApplication.shared
            let statusBarHeight: CGFloat = app.statusBarFrame.size.height
            
            let statusbarView = UIView()
            statusbarView.backgroundColor = hexStringToUIColor(hex: "8CCA73")
            view.addSubview(statusbarView)
          
            statusbarView.translatesAutoresizingMaskIntoConstraints = false
            statusbarView.heightAnchor
              .constraint(equalToConstant: statusBarHeight).isActive = true
            statusbarView.widthAnchor
                .constraint(equalTo: view.widthAnchor, multiplier: 1.0).isActive = true
            statusbarView.topAnchor
                .constraint(equalTo: view.topAnchor).isActive = true
            statusbarView.centerXAnchor
                .constraint(equalTo: view.centerXAnchor).isActive = true
          
        } else {
            let statusBar = UIApplication.shared.value(forKeyPath: "statusBarWindow.statusBar") as? UIView
            statusBar?.backgroundColor = UIColor.red
        }
    }
    
    //TO HERE
    
    override func viewDidLoad(){
        super.viewDidLoad()
        
        let htmlPath = Bundle.main.path(forResource: "inlog", ofType: "html")
        let url = URL(fileURLWithPath: htmlPath!)
        let request = URLRequest(url: url)
        
        webview.load(request)
        
        var error: NSError?
        GGLContext.sharedInstance()?.configureWithError(&error)
        GIDSignIn.sharedInstance().delegate=self
        GIDSignIn.sharedInstance().uiDelegate=self
        
    }
    @IBAction func signIn(sender: AnyObject) {
        GIDSignIn.sharedInstance().signIn()
    }
    @IBAction func signOut(sender: AnyObject) {
        GIDSignIn.sharedInstance().signOut()
        
    }
    func sign(_ signIn: GIDSignIn!, didSignInFor user: GIDGoogleUser!, withError error: Error!) {
    }
}
